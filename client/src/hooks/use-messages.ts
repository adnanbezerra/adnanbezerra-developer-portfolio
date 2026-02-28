import { useMutation } from "@tanstack/react-query";
import { api, type MessageInput } from "@shared/routes";

export function useCreateMessage() {
    return useMutation({
        mutationFn: async (data: MessageInput) => {
            const res = await fetch(api.messages.create.path, {
                method: api.messages.create.method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                if (res.status === 400) {
                    const error = await res.json();
                    throw new Error(error.message || "Validation failed");
                }
                throw new Error("Failed to send message");
            }

            return res.json();
        },
    });
}
