import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    // Delegate to internal action that can use Node APIs
    return await ctx.runAction(internal.actions.clerkWebhook, { request });
  }),
});

http.route({
  path: "/generate-program",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    // Delegate to internal action that can use Node APIs
    return await ctx.runAction(internal.actions.generateProgram, { request });
  }),
});

http.route({
  path: "/test",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    try {
      return new Response(
        JSON.stringify({
          success: true,
          data: {},
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Error in test endpoint:", error);
      return new Response(
        JSON.stringify({
          success: false,
          error: error instanceof Error ? error.message : String(error),
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }),
});

export default http;