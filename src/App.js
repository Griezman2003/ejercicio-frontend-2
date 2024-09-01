import React, { Component } from 'react';
import employees from './employees';
import '../src/style.css';

// Componente de la tabla de empleados :)
const EmployeesTable = ({ employees, onEditClick, onDeleteClick }) => (
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Empresa</th>
        <th>Salario</th>
        <th>Edad</th>
        <th>Teléfono</th>
        <th>Email</th>
        <th>Acción</th>
      </tr>
    </thead>
    <tbody>
      {employees.map(employee => (
        <tr key={employee.id}>
          <td>{employee.id}</td>
          <td>{employee.name}</td>
          <td>{employee.company}</td>
          <td>${employee.salary.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
          <td>{employee.age}</td>
          <td>{employee.phone}</td>
          <td>{employee.email}</td>
          <td>
            <button className="action-button" onClick={() => onEditClick(employee)}>
              Editar
            </button>
            <button className="action-button-eliminar" onClick={() => onDeleteClick(employee.id)}>
              Eliminar
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

// Componente del formulario de edición :)
const EditForm = ({ employee, newSalary, onSalaryChange, onSaveClick, onCancelClick }) => (
  <div className="edit-form">
    <h2>Editar Empleado</h2>
    <form>
      <label>
        Nombre:
        <input type="text" value={employee.name} readOnly />
      </label>
      <label>
        Empresa:
        <input type="text" value={employee.company} readOnly />
      </label>
      <label>
        Salario:
        <input 
          type="number" 
          value={newSalary} 
          onChange={onSalaryChange} 
          step="0.01" 
        />
      </label>
      <button type="button" className="action-button" onClick={onSaveClick}>
        Guardar
      </button>
      <button type="button" className="action-button" onClick={onCancelClick}>
        Cancelar
      </button>
    </form>
  </div>
);

class App extends Component {
  state = {
    employees: employees,
    editingEmployee: null,
    newSalary: ''
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

  render() {
    const { employees, editingEmployee, newSalary } = this.state;
    return (
      <div id='employees' style={{ position: 'relative', paddingBottom: '50px' }}>
        <EmployeesTable 
          employees={employees} 
          onEditClick={this.handleEditClick} 
          onDeleteClick={this.handleDeleteClick} 
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
