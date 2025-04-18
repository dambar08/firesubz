import { relations, sql } from "drizzle-orm";
import { index, primaryKey, pgTableCreator, text, integer, real, } from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `firesubz_${name}`);

export const posts = createTable(
  "post",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: 256 }),
    createdById: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("created_by_idx").on(t.createdById),
    index("name_idx").on(t.name),
  ],
);

export const users = createTable("user", (d) => ({
  id: d
    .varchar({ length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: d.varchar({ length: 255 }),
  email: d.varchar({ length: 255 }).notNull(),
  emailVerified: d.timestamp({ mode: "date", withTimezone: true }).default(sql`CURRENT_TIMESTAMP`),
  image: d.varchar({ length: 255 }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  subscriptions: many(subscriptions),
  notifications: many(notifications),
}));

export const accounts = createTable(
  "account",
  (d) => ({
    userId: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => users.id),
    type: d.varchar({ length: 255 }).$type<AdapterAccount["type"]>().notNull(),
    provider: d.varchar({ length: 255 }).notNull(),
    providerAccountId: d.varchar({ length: 255 }).notNull(),
    refresh_token: d.text(),
    access_token: d.text(),
    expires_at: d.integer(),
    token_type: d.varchar({ length: 255 }),
    scope: d.varchar({ length: 255 }),
    id_token: d.text(),
    session_state: d.varchar({ length: 255 }),
  }),
  (t) => [
    primaryKey({
      columns: [t.provider, t.providerAccountId],
    }),
    index("account_user_id_idx").on(t.userId),
  ],
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  (d) => ({
    sessionToken: d.varchar({ length: 255 }).notNull().primaryKey(),
    userId: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => users.id),
    expires: d.timestamp({ mode: "date", withTimezone: true }).notNull(),
  }),
  (t) => [index("session_user_id_idx").on(t.userId)],
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  (d) => ({
    identifier: d.varchar({ length: 255 }).notNull(),
    token: d.varchar({ length: 255 }).notNull(),
    expires: d.timestamp({ mode: "date", withTimezone: true }).notNull(),
  }),
  (t) => [primaryKey({ columns: [t.identifier, t.token] })],
);

export const subscriptions = createTable(
  'subscription',
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: 100 }).notNull(),
    price: d.real().notNull(),
    currency: d.text({ enum: ['USD', 'EUR', 'GBP'] }).default('USD'),
    frequency: d.text({ enum: ['daily', 'weekly', 'monthly', 'yearly','one-time'] }).default('one-time'),
    category: d.text({ enum: ['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other'] }).notNull(),
    paymentMethod: d.text().notNull(),
    status: d.text({ enum: ['active', 'cancelled', 'expired'] }).default('active'),
    startDate: d.timestamp({ mode: 'date', withTimezone: true }).notNull(),
    renewalDate: d.timestamp({ mode: 'date', withTimezone: true }),
    userId: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => users.id),
  }),
  (t) => ([
    index('subscription_name_idx').on(t.name),
    index('price_idx').on(t.price),
    index('start_date_idx').on(t.startDate),
    index('renewal_date_idx').on(t.renewalDate),
  ])
);

export const subscriptionRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, { fields: [subscriptions.userId], references: [users.id] }),
}));

export const notifications = createTable("notifications", (d) => ({
  id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
  userId: d
    .varchar({ length: 255 })
    .notNull()
    .references(() => users.id),
  title: d.varchar({ length: 255 }).notNull(),
  message: d.text().notNull(),
  createdAt: d.timestamp({ withTimezone: true }).defaultNow().notNull(),
  readAt: d.timestamp({ withTimezone: true }),
  type: d.varchar({ length: 50 }),
}), (t) => ([
  index("idx_notifications_user_id").on(t.userId),
  index("idx_notifications_created_at").on(t.createdAt),
  index("idx_notifications_user_id_read").on(t.userId, t.readAt),
]));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}));