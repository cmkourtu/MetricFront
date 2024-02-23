import { ID, Response } from '../../../../../../_metronic/helpers';
export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  jobTitle: string;
  registeredAt: string;
  subscription: string;
};

export type UsersQueryResponse = Response<Array<User>>;
