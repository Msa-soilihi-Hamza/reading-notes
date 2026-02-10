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
      table.string('category', 100).nullable()
      table.text('description').nullable()
      table.text('ingredients', 'longtext').nullable()
      table.text('instructions', 'longtext').nullable()
      table.integer('cooking_time').unsigned().nullable()
      table.integer('servings').unsigned().nullable()
      table.string('difficulty', 50).defaultTo('moyen')
      table.string('image_url', 500).nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
