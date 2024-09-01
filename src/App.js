import React, { Component } from 'react';
import employees from './employees';
import '../src/main.css';

// Componente de la tabla de empleados
const EmployeesTable = ({ employees, onEditClick, onDeleteClick, isUSD, onToggleCurrency, filterText, onFilterChange, handlePrintClick }) => (
  <div>
    <div className="filter-container">
      <input
        type="text"
        placeholder="Buscar por nombre o empresa"
        value={filterText}
        onChange={onFilterChange}
        className="filter-input"
      />
    </div>
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
        {employees
          .filter(employee =>
            employee.name.toLowerCase().includes(filterText.toLowerCase()) ||
            employee.company.toLowerCase().includes(filterText.toLowerCase())
          )
          .map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.company}</td>
              <td>
                ${isUSD 
                  ? (employee.salary / 21.50).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) 
                  : employee.salary.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
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
    <button className="action-button-us" onClick={onToggleCurrency}>
      Mostrar moneda en {isUSD ? 'MXN' : 'USD'}
    </button>
    <button className="action-button-print" onClick={handlePrintClick}>
      Imprimir Lista
    </button>
  </div>
);

// Componente del formulario de edición
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
