import BreedEnum from '../enum/breed.enum';
import GenderEnum from '../enum/gender.enum';

type User = {
  id?: string;
  email: string;
  password: string;
  userName: string;
  gender: GenderEnum;
  breed: BreedEnum;
};

export default User;
