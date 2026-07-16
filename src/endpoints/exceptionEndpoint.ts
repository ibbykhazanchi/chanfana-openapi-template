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
			console.log("Caught exception:", err);
			console.warn("Caught exception: ", err)
			console.error("caught exception:, ", err)
			console.log(err, err, err)
			console.log(err, "hi", err)
			console.log({"errorInfo": "hi"})
			console.log({"errorInfo": "yo"}, err)

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
