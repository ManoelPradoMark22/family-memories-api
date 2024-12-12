export interface UserAttributes {
  id: number;
  name: string;
  birthday: string;
  avatar?: string;
  email: string;
  password: string;
  created_at?: string;
  updated_at?: string;
}

export type UserCreationAttributes = Omit<UserAttributes, 'id' | 'created_at' | 'updated_at'>;

export interface AlbumAttributes {
  id: number;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type AlbumCreationAttributes = Omit<AlbumAttributes, 'id' | 'created_at' | 'updated_at'>;