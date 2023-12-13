/*
dbCreator.js
A standalone program that will initialize the gym database with all tables
To run: node dbCreator.js
*/

const mysql = require('mysql2');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass",
});

function createDB() {
    con.connect(function (err) {
        if (err) {
            console.error('dbCreator: Error connecting to the database:', err);
            return;
        }
        console.log("dbCreator: Connected to the database");

        createEmpty(function () {
            con.changeUser({ database: 'gymdb' }, function (err) {
                if (err) {
                    console.error('dbCreator: Error selecting database:', err);
                    return;
                }

                // Create member table
                createTable("Member", "CREATE TABLE `gymdb`.`Member` (" +
                "`member_id` CHAR(8) PRIMARY KEY," +
                "`name` CHAR(50)," +
                "`phone_number` CHAR(15)," +
                "`emergency_contact` CHAR(15)," +
                "`address` CHAR(100)," +
                "`credit_card` CHAR(20)," +
                "`franchise_number` char(8)," +
                "`trainer_employee_id` char(8)" +
                ");");

                // Create Employee table
                createTable("Employee", "CREATE TABLE `gymdb`.`Employee` (" +
                "`employee_id` CHAR(8) PRIMARY KEY," +
                "`name` CHAR(50)," +
                "`phone_number` CHAR(15)," +
                "`availability` CHAR(100)," +
                "`emergency_contact` TEXT," +
                "`franchise_number` char(8)" +
                ");");

                // Create trainer table
                createTable("Trainer", "CREATE TABLE `gymdb`.`Trainer` (" +
                "`employee_id` CHAR(8) PRIMARY KEY," +
                "`schedule` CHAR(100)," +
                "`clients` TEXT," +
                "`specialization` CHAR(50)" +
                ");");

                // Create manager table
                createTable("Manager", "CREATE TABLE `gymdb`.`Manager` (" +
                "`employee_id` CHAR(8) PRIMARY KEY" +
                ");");

                // Create receptionist table
                createTable("Receptionist", "CREATE TABLE `gymdb`.`Receptionist` (" +
                "`employee_id` char(8) PRIMARY KEY" +
                ");");

                // Create equipment table
                createTable("Equipment", "CREATE TABLE `gymdb`.`Equipment` (" +
                "`equipment_id` char(8) PRIMARY KEY," +
                "`equipment_condition` CHAR(50)," +
                "`name` CHAR(50)," +
                "`date_bought` DATE," +
                "`maintenance_history` TEXT" +
                ");");

                // Create workout plan table
                createTable("WorkoutPlan", "CREATE TABLE `gymdb`.`WorkoutPlan` (" +
                "`report_number` char(8) PRIMARY KEY," +
                "`employee_id` char(8)," +
                "`date_generated` DATE," +
                "`days_of_the_week` CHAR(50)," +
                "`frequency` CHAR(20)," +
                "`exercises` TEXT" +
                ");");

                // Create incident report table
                createTable("IncidentReport", "CREATE TABLE `gymdb`.`IncidentReport` (" +
                "`report_number` char(8) PRIMARY KEY," +
                "`people_involved` TEXT," +
                "`equipment_involved` TEXT," +
                "`date` DATE," +
                "`time` TIME" +
                ");");

                // Create revenue report table
                createTable("RevenueReport", "CREATE TABLE `gymdb`.`RevenueReport` (" +
                "`reference_number` char(8) PRIMARY KEY," +
                "`revenue_generated` DECIMAL(10, 2)," +
                "`period` CHAR(50)," +
                "`expenditure` DECIMAL(10, 2)" +
                ");");

                // Create paycheck table
                createTable("Paycheck", "CREATE TABLE `gymdb`.`Paycheck` (" +
                "`reference_number` char(8) PRIMARY KEY," +
                "`employee_id` char(8)," +
                "`period` CHAR(50)," +
                "`hours_worked` DECIMAL(5, 2)," +
                "`amount` DECIMAL(10, 2)," +
                "`tax_deductions` DECIMAL(8, 2)," +
                "`hourly_rate` DECIMAL(8, 2)," +
                "`bank_account_info` CHAR(20)" +
                ");");

                // Create shift schedule table
                createTable("ShiftSchedule", "CREATE TABLE `gymdb`.`ShiftSchedule` (" +
                "`date` DATE PRIMARY KEY," +
                "`employees` TEXT," +
                "`break` DECIMAL(5, 2)," +
                "`total_hours` DECIMAL(5, 2)" +
                ");");

                // Create gym location table
                createTable("GymLocation", "CREATE TABLE `gymdb`.`GymLocation` (" +
                "`franchise_number` char(8) PRIMARY KEY," +
                "`name` CHAR(50)," +
                "`address` CHAR(100)" +
                ");");

                //Add all foreign keys once tables are created
                alterTable("Member", "ALTER TABLE `Member` ADD FOREIGN KEY (`franchise_number`) REFERENCES `GymLocation`(`franchise_number`);");
                alterTable("Member", "ALTER TABLE `Member` ADD FOREIGN KEY (`trainer_employee_id`) REFERENCES `Trainer`(`employee_id`);");
                alterTable("Employee", "ALTER TABLE `Employee` ADD FOREIGN KEY (`franchise_number`) REFERENCES `GymLocation`(`franchise_number`);");
                alterTable("Manager", "ALTER TABLE `Manager` ADD FOREIGN KEY (`employee_id`) REFERENCES `Employee`(`employee_id`);");
                alterTable("Receptionist", "ALTER TABLE `Receptionist` ADD FOREIGN KEY (`employee_id`) REFERENCES `Employee`(`employee_id`);");
                alterTable("WorkoutPlan", "ALTER TABLE `WorkoutPlan` ADD FOREIGN KEY (`employee_id`) REFERENCES `Employee`(`employee_id`);");
                alterTable("Paycheck", "ALTER TABLE `Paycheck` ADD FOREIGN KEY (`employee_id`) REFERENCES `Employee`(`employee_id`);");

            });
        });
    });
}

function createEmpty(callback) {
    con.query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'gymdb'", function (err, rows) {
        if (err) {
            console.error('dbCreator: Error checking if database exists:', err);
            return;
        }

        if (rows.length > 0) {
            con.query("DROP DATABASE gymdb", function (err, result) {
                if (err) {
                    console.error('dbCreator: Error deleting database:', err);
                    return;
                }
                console.log("dbCreator: Database 'gymdb' deleted");
            });
        }

        con.query("CREATE DATABASE gymdb", function (err, result) {
            if (err) {
                console.error('dbCreator: Error creating database:', err);
                return;
            }
            console.log("dbCreator: Database 'gymdb' created");

            callback();
        });
    });
}

function createTable(name, query) {
    con.query(query, function (err, result) {
        if (err) throw err;
        console.log(`dbCreator: ${name} table created`);
    });
}

function alterTable(name, query) {
    con.query(query, function (err, result) {
        if (err) throw err;
        console.log(`dbCreator: ${name} table altered`);
    });
}

// Check if the script is being run directly (not required by another script)
if (require.main === module) {
    createDB();
}

