import React from 'react';

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
            <td className={`salary ${employee.salary < 10000 ? 'low-salary' : 'high-salary'}`}>
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
        
        export default EmployeesTable;
        