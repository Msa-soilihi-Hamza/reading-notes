import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'books'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable()

      table.string('title', 255).notNullable()
      table.string('author', 255).notNullable()
      table.text('description').nullable()
      table.integer('rating').unsigned().nullable()
      table.integer('pages').unsigned().nullable()
      table.string('status', 50).defaultTo('to_read')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}