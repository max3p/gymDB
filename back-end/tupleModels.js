/*
tupleModels.js
Contains objects that model tuples for all mysql tables
Use as reference when inserting tuples
*/

const Member = {
    member_id: "",
    name: "",
    phone_number: "",
    emergency_contact: "",
    address: "",
    credit_card: "",
    franchise_number: "",
    trainer_employee_id: ""
};

const Worker = {
    employee_id: "",
    name: "",
    phone_number: "",
    availability: "",
    emergency_contact: "",
    franchise_number: ""
};

const Trainer = {
    employee_id: "",
    schedule: "",
    clients: "",
    specialization: ""
};

const Manager = {
    employee_id: ""
};

const Receptionist = {
    employee_id: ""
};

const Equipment = {
    equipment_id: "",
    equipment_condition: "",
    name: "",
    date_bought: "",
    maintenance_history: ""
};

const WorkoutPlan = {
    report_number: "",
    employee_id: "",
    date_generated: "",
    days_of_the_week: "",
    frequency: "",
    exercises: ""
};

const IncidentReport = {
    report_number: "",
    people_involved: "",
    equipment_involved: "",
    date: "",
    time: ""
};

const RevenueReport = {
    reference_number: "",
    revenue_generated: 0.0,
    period: "",
    expenditure: 0.0
};

const Paycheck = {
    reference_number: "",
    employee_id: "",
    period: "",
    hours_worked: 0.0,
    amount: 0.0,
    tax_deductions: 0.0,
    hourly_rate: 0.0,
    bank_account_info: ""
};

const ShiftSchedule = {
    date: "",
    employees: "",
    break: 0.0,
    total_hours: 0.0
};

const GymLocation = {
    franchise_number: "",
    name: "",
    address: ""
};

module.exports = {
    Member,
    Worker,
    Trainer,
    Manager,
    Receptionist,
    Equipment,
    WorkoutPlan,
    IncidentReport,
    RevenueReport,
    Paycheck,
    ShiftSchedule,
    GymLocation
};
