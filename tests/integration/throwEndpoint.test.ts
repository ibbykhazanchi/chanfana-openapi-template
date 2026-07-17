import { SELF } from "cloudflare:test";
import { describe, expect, it } from "vitest";

describe("GET /throw", () => {
	it("returns the global error response", async () => {
		const response = await SELF.fetch("http://local.test/throw");
		const body = await response.json();

		expect(response.status).toBe(500);
		expect(body).toEqual({
			success: false,
			errors: [{ code: 7000, message: "Internal Server Error" }],
		});
	});
});
