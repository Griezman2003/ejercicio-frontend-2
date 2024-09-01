import React, { Component } from 'react';
import employees from './employees';
import '../src/style.css';

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

  render() {
    const { employees, editingEmployee, newSalary } = this.state;
    return (
      <div id='employees' style={{ position: 'relative', paddingBottom: '50px' }}>
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
                  <button 
                    className="action-button" 
                    onClick={() => this.handleEditClick(employee)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {editingEmployee && (
          <div className="edit-form">
            <h2>Editar Empleado</h2>
            <form>
              <label>
                Nombre:
                <input type="text" value={editingEmployee.name} readOnly />
              </label>
              <label>
                Empresa:
                <input type="text" value={editingEmployee.company} readOnly />
              </label>
              <label>
                Salario:
                <input 
                  type="number" 
                  value={newSalary} 
                  onChange={this.handleChange} 
                  step="0.01" 
                />
              </label>
              <button type="button" className="action-button" onClick={this.handleSaveClick}>
                Guardar
              </button>
              <button type="button" className="action-button" onClick={this.handleCancelClick}>
                Cancelar
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default App;
