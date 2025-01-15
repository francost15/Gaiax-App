import { redirect } from "next/navigation";

export default function NotFoundPageHome(){
    return(
        redirect("/auth/login")
    );
}