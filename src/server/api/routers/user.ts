import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ wallet: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.user.findUnique({
        where: { wallet: input.wallet },
        include: { credit: true },
      });
    }),
  add: privateProcedure
    .input(z.object({ wallet: z.string(), email: z.string().email() }))
    .mutation(async ({ ctx, input }) => {
      const found = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      });

      if (found !== null) {
        return found;
      } else {
        return await ctx.prisma.user.create({
          data: {
            wallet: input.wallet,
            email: input.email,
            credit: {
              create: { wallet: input.wallet, credit: 2 },
            },
          },
          include: {
            credit: true,
          },
        });
      }
    }),
});
