type Transformation<Input, Output> = (input: Input) => Output;

type RawUser = {
  userName: string;
  email: string;
};

type ProcessedUser = {
  userName: string;
  email: string;
  address: string;
};

const normalizeUserName: Transformation<RawUser, RawUser> = (user) => ({
  ...user,
  userName: user.userName.trim(),
});

const validateEmailFormat: Transformation<RawUser, RawUser> = (user) => {
  const regex = /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/;
  if (!regex.test(user.email)) {
    throw new Error("Invalid email");
  }
  return user;
};

const fetchUserAddress: Transformation<RawUser, ProcessedUser> = (user) => {
  const address = "abc";
  return { ...user, address };
};

function createPipeline<InputType, OutputType>(
  transformations: Transformation<any, any>[],
  validator: (data: unknown) => data is OutputType
): (initialData: InputType) => Promise<OutputType | Error> {
  return async (initialData: InputType) => {
    let processedData: unknown = initialData;

    for (const transformer of transformations) {
      try {
        processedData = transformer(processedData);
      } catch (err) {
        return err;
      }
    }
    return validator(processedData) ? processedData : new Error("Error");
  };
}

function isProcessedUser(data: unknown): data is ProcessedUser {
  return (
    typeof data === "object" &&
    data != null &&
    typeof (data as any).userName === "string" &&
    typeof (data as any).email === "string" &&
    typeof (data as any).address === "string"
  );
}

const pipeline = createPipeline<RawUser, ProcessedUser>(
  [normalizeUserName, validateEmailFormat, fetchUserAddress],
  isProcessedUser
);

// success case
pipeline({ userName: "Ankit", email: "abc@gmail.com" })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

// failed case
pipeline({ userName: "Ankur", email: "abc" })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
