declare namespace LOGIN {
  type registryForm = {
    authCode: string;
    password: string;
    telephone: string;
    username: string;
    departmentCode: string | null;
    organizationCode: string | null;
  };
}
