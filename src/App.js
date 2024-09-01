import React, { Component } from 'react';
import EmployeesTable from './components/EmployeesTable';
import EditForm from './components/EditForm';
import employees from './employees';
import '../src/main.css';

class App extends Component {
  state = {
    employees: employees,
    editingEmployee: null,
    newSalary: '',
    isUSD: false,
    filterText: '' 
  };

  handleEditClick = (employee) => {
    this.setState({
      editingEmployee: employee,
      newSalary: employee.salary
    });
  };

  handleChange = (event) => {
    this.setState({ newSalary: event.target.value });
  };

  handleSaveClick = () => {
    const { editingEmployee, newSalary, employees } = this.state;
    if (editingEmployee) {
      const updatedEmployees = employees.map(employee =>
        employee.id === editingEmployee.id ? { ...employee, salary: parseFloat(newSalary) } : employee
      );
      this.setState({
        employees: updatedEmployees,
        editingEmployee: null,
        newSalary: ''
      });
    }
  };

  handleCancelClick = () => {
    this.setState({
      editingEmployee: null,
      newSalary: ''
    });
  };

  handleDeleteClick = (employeeId) => {
    const { employees } = this.state;
    const updatedEmployees = employees.filter(employee => employee.id !== employeeId);
    this.setState({ employees: updatedEmployees });
  };

  handleToggleCurrency = () => {
    this.setState(prevState => ({ isUSD: !prevState.isUSD }));
  };

  handleFilterChange = (event) => {
    this.setState({ filterText: event.target.value });
  };

  handlePrintClick = () => {
    const { employees } = this.state;
    console.log('Lista de Empleados:', employees);
    alert('lista cargada en la consola');
  };

  render() {
    const { employees, editingEmployee, newSalary, isUSD, filterText } = this.state;
    return (
      <div id='employees' style={{ position: 'relative', paddingBottom: '50px' }}>
        <EmployeesTable 
          employees={employees} 
          onEditClick={this.handleEditClick} 
          onDeleteClick={this.handleDeleteClick} 
          isUSD={isUSD}
          onToggleCurrency={this.handleToggleCurrency}
          filterText={filterText}
          onFilterChange={this.handleFilterChange}
          handlePrintClick={this.handlePrintClick}
        />
        {editingEmployee && (
          <EditForm 
            employee={editingEmployee} 
            newSalary={newSalary} 
            onSalaryChange={this.handleChange} 
            onSaveClick={this.handleSaveClick} 
            onCancelClick={this.handleCancelClick} 
          />
        )}
      </div>
    );
  }
}

export default App;
