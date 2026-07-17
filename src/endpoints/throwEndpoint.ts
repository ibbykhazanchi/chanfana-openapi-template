import { contentJson, OpenAPIRoute } from "chanfana";
import { z } from "zod";

export class ThrowEndpoint extends OpenAPIRoute {
	public schema = {
		tags: ["Dummy"],
		summary: "Throws an unhandled exception",
		operationId: "throw-endpoint",
		responses: {
			"500": {
				description: "Returns the global error response",
				...contentJson({
					success: z.literal(false),
					errors: z.array(
						z.object({
							code: z.number(),
							message: z.string(),
						}),
					),
				}),
			},
		},
	};

	public async handle() {
		throw new Error("This is a deliberately unhandled exception");
	}
}
