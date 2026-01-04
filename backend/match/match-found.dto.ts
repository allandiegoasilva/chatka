import { UserGender } from "../user/enum/user-gender.enum";

export type MatchFoundDto = {
  matchId: string;
  startOffer: boolean;
  remoteUser: {
    username: string;
    gender: UserGender;
    countryCode: string | null;
    state: string | null;
  };
};
