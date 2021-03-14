import { useState, useCallback, useEffect } from "react";

const storageName = "userData";

const useAuth = () => {
  const [token, setToken] = useState<string>("");
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [userImage, setUserImage] = useState<string[]>([""]);

  const login = useCallback(
    (jwtToken: string, id: string, userName: string, image: string[]) => {
      setToken(jwtToken);
      setUserId(id);
      setName(userName);
      setUserImage(image);
      localStorage.setItem(
        storageName,
        JSON.stringify({
          userId: id,
          token: jwtToken,
          name: userName,
          userImage: image,
        })
      );
    },
    []
  );

  const logout = useCallback(() => {
    setToken("");
    setUserId("");
    setName("");
    setUserImage([""]);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    // const data = JSON.parse(localStorage.getItem(storageName) || "{}");
    // if (data && data.token) {
    //   login(data.token, data.userId);
    // }
    // setReady(true);
  }, [login]);

  return { login, logout, token, userId, name, userImage, ready };
};

export default useAuth;
