import { Base64 } from 'js-base64'

export const readableCounter = (secs) => {
  let seconds = Number(secs);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds / 60) % 60;
  seconds = Math.floor(seconds) % 60;
  return [hours, minutes, seconds]
      .map((v, i) => v < 10 ? "0" + v : v)
      .join(":");
};

export const formatDate = date => {
  return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
}

export function parseJWT(jwtStr) {
  if (!jwtStr) return null
  if (jwtStr.split('.').length !== 3) return null

  let header = jwtStr.split('.')[0]
  let payload = jwtStr.split('.')[1]
  let signature = jwtStr.split('.')[2]

  header = Base64.decode(header) 
  payload = Base64.decode(payload)
  signature = Base64.decode(signature)


  const jwt = {
    header: JSON.parse(header),
    payload: JSON.parse(payload),
    signature: signature
  }

  return jwt
}
