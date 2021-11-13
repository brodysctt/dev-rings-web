import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
// import { createWebhook } from "./utils";

export const AddWebhookForm = ({ userId }: { userId: string }) => {
  const [userIsTyping, setUserIsTyping] = useState(false);

  const {
    register,
    watch,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm<{ repo: string }>();

  const validRepoUrl = new RegExp(`https://github.com/${userId}/.*.git`);

  const onSubmit: SubmitHandler<{ repo: string }> = ({ repo }) =>
    console.log(`form submitted! here be the repo: ${repo}`);

  watch(({ repo }) => {
    if (repo && validRepoUrl.test(repo)) {
      handleSubmit(onSubmit)();
    }
    // TODO: Handle case where the userId doesn't match – "you're not the owner of this repo. Try adding one you own 🤷‍♂️"
    // TODO: Handle case where they paste in a non-github link – "bruh, that's not even a github link 😂 😂 😂 "
    // TODO: ^ For this case, render gif for how to copy URL lol
    if (repo && !validRepoUrl.test(repo)) {
      setUserIsTyping(true);
    }
  });

  if (isSubmitSuccessful) {
    return <p>successfully added the repo bruh ✅</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "16vh",
        width: "200px",
        marginBottom: "200px",
      }}
    >
      <p>Add another repo 👇</p>
      <form>
        <input
          {...register("repo", {
            pattern: {
              value: validRepoUrl,
              message: "hey buddy, try pasting a proper url this time",
            },
          })}
        />
        {userIsTyping && <p>{`bruh, what part of PASTE don't u understand`}</p>}
        {errors.repo && <p>{errors.repo.message}</p>}
      </form>
    </div>
  );
};
