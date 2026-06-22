export type ScoutUser = {
  created_at: string;
  updated_at: string;
  user_account_id: string;
  userStatus: string;
  username: string;
  email: string;
};

export type PublicProfile = {
  user_account_id: string;
  first_name?: string;
  last_name?: string;
  display_name?: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  website?: string;
  interests?: string[];
  profession?: string;
  company?: string;
  industry?: string;
};
