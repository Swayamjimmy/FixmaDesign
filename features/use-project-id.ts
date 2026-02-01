import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const useGetProjectById = (projectId: string) => {
    return useQuery({
        queryKey: ["projects", projectId],
        queryFn: async () => {
            const res = await axios.get(`/api/projects/${projectId}`);
            return res.data;
        },
        enabled: !!projectId,
    });
};


export const useGenerateDesignById = (projectId: string | null) => {
    const router = useRouter();
    return useMutation({
        mutationFn: async (prompt: string) => {
            const response = await axios.post(`/api/projects/${projectId}`, {
                prompt,
            });
            return response.data;
        },
        onSuccess: (data) => {
            toast.success("Generation started");
        },
        onError: (error) => {
            console.log("Project failed", error);
            toast.error("Failed to generate");
        },
    });
};