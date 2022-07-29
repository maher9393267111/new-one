import { supabase } from './db';

export const signUp = async (email, password, data) => {
  try {
    const {
      user,
      error,
    } = await supabase.auth.signUp(
      {
        email,
        password,
      },
      { data },
    );
    if (error) return error;
    const {
      id,
      user_metadata: userMetadata,
      updated_at: updatedAt,
    } = user;  // user info after signup
    console.log('user 💡💡💡--->', user);
    await supabase
      .from('users')
      .insert([
        {
          id, 
          //updated_at: updatedAt,
         //   ...userMetadata,
      //   first_name: userMetadata.first_name,
         //   last_name: userMetadata.last_name,

          // ...userMetadata,
        },
      ]);
  } catch (err) {
    throw new Error(err);
  }
};

export const signIn = async (email, password) => supabase.auth.signIn({
  email,
  password,
});

export const signOut = async () => supabase.auth.signOut();