import { z } from "zod";

const notificationSchema = z.object({
    educatorId: z.string().min(3).max(100),
    title: z.string().min(3).max(100),
    content: z.string().min(3).max(500),
    date: z.string().min(3).max(15),
    read: z.boolean(),
});

export default notificationSchema;