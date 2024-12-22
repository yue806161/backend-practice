import { DatabaseType } from '../database/factory';
import { randomUUID } from 'crypto';
import { EmployeeTable } from '../database/employee.table';
import { IEmployee } from '../models/employee';

export class EmployeeService {
  private static instance: EmployeeService;
  public employeeTable: EmployeeTable;

  private constructor(databaseType: DatabaseType) {
    this.employeeTable = new EmployeeTable(databaseType);
  }

  public static getInstance(databaseType: DatabaseType): EmployeeService {
    if (!EmployeeService.instance) {
      EmployeeService.instance = new EmployeeService(databaseType);
    }
    return EmployeeService.instance;
  }

  async getEmployee(query: Partial<IEmployee>, options: unknown = {}) {
    return this.employeeTable.read(query, options);
  }

  async createEmployee(data: Omit<IEmployee, 'id'>) {
    const newEmployee = {
      id: randomUUID(),
      ...data,
      timestamps: { created_at: Date.now(), updated_at: Date.now() },
    };

    return this.employeeTable.create(newEmployee);
  }

  async updateEmployee(id: string, data: Partial<IEmployee>) {
    const updatedUser = {
      ...data,
      timestamps: { updated_at: Date.now() },
    };

    return this.employeeTable.update({ id }, updatedUser);
  }

  async deleteEmployee(id: string) {
    return this.employeeTable.delete({ id });
  }
}
