import { contentJson, OpenAPIRoute } from "chanfana";
import { AppContext } from "../types";
import { z } from "zod";

export class ExceptionEndpoint extends OpenAPIRoute {
	public schema = {
		tags: ["Dummy"],
		summary: "this endpoint creates an exception and logs it",
		operationId: "exception-endpoint",
		responses: {
			"200": {
				description: "Returns the caught exception message",
				...contentJson({
					success: Boolean,
					result: z.object({
						msg: z.string(),
						error: z.string(),
					}),
				}),
			},
		},
	};

	public async handle(c: AppContext) {
		try {
			throw new Error("This is a deliberately created exception");
		} catch (err) {
			console.log("caught exception:", err)

			return {
				success: true,
				result: {
					msg: "an exception was created and logged",
					error: err instanceof Error ? err.message : String(err),
				},
			};
		}
	}
}
