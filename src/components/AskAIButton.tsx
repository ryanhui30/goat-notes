"use cliet";

import { User } from "@supabase/supabase-js";

type Props = {
    user: User;
};

function AskAIButton({ user }: Props) {
    console.log(user.email);
    return <div>AskAIButton</div>;
}

export default AskAIButton;
