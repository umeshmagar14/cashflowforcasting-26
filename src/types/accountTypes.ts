export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'investment';
  balance: number;
  currency: string;
}

export interface Entity {
  id: string;
  name: string;
  type: 'subsidiary' | 'branch' | 'division';
  accounts: Account[];
  subEntities?: Entity[];
}

export interface Corporate {
  id: string;
  name: string;
  type: 'corporate' | 'sme';
  rootEntity: Entity;
}