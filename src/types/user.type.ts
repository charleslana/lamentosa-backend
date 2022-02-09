import BreedEnum from '../enum/breed.enum';
import GenderEnum from '../enum/gender.enum';
import RoleEnum from '../enum/role.enum';

type User = {
  id?: string;
  email: string;
  password?: string;
  name: string;
  gender: GenderEnum;
  breed: BreedEnum;
  role?: RoleEnum;
};

export default User;
