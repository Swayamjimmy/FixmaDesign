import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation";
import { toast } from "sonner"


export const useCreateProject = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: async (prompt: string) => {
            const response = await axios.post("/api/projects", {
                prompt,
            });
            return response.data;
        },
        onSuccess: (data) => {
            if (data.success && data.data?.id) {
                router.push(`/project/${data.data.id}`);
            } else {
                toast.error("Failed to create project");
            }
        },
        onError: (error) => {
            console.log("Project failed", error);
            toast.error("Failed to create project");
        },
    });
};

export const useGetProjects = (userId?: string) => {
    return useQuery({
        queryKey: ["projects", userId],
        queryFn: async () => {
            const res = await axios.get("/api/projects");
            return res.data.data;
        },
        enabled: !!userId,
    });
};