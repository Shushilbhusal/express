import { TokenModal } from "./token.mongodb-modal"




type tokenInput = {
    u_id: string,
    token: string
}

export const createToken = async (input: tokenInput)=>{
    const generatedToken = new TokenModal({
        user_id:input.u_id,
        token:input.token
    })
    await generatedToken.save();
}

export const deleteToken = async (user_id: string, token: string) => {
  console.log("Delete u_id ", user_id);
  console.log("Delete token", token);
  const result = await TokenModal.deleteOne({ user_id: user_id, token });
  return result.deletedCount > 0;
};


export const getToken = async (Token:string)=>{
    const token = await TokenModal.findOne({
       token: Token
    })
    return token;
}
