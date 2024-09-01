import React from 'react';

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

export default EditForm;
