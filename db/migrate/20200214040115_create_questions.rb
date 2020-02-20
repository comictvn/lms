class CreateQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :questions do |t|
      t.references :assignment, null: false, index: true, foreign_key: { on_delete: :cascade }
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
