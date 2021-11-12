import { useForm, SubmitHandler } from "react-hook-form";
import { createWebhook } from "./utils";

export const AddWebhookForm = ({ userId }: { userId: string }) => {
  const { register, handleSubmit } = useForm<{ repo: string }>();
  const onSubmit: SubmitHandler<{ repo: string }> = ({ repo }) =>
    createWebhook(userId, repo);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        height: "16vh",
        width: "200px",
        marginBottom: "200px",
      }}
    >
      <p>Add another repo 👇</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Repo</label>
        <input {...register("repo")} />
        <input type="submit" />
      </form>
    </div>
  );
};
