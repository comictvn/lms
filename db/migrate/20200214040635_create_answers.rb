class CreateAnswers < ActiveRecord::Migration[6.0]
  def change
    create_table :answers do |t|
      t.references :question, null: false, index: true, foreign_key: { on_delete: :cascade }
      t.text :description
      t.boolean :is_correct, default: false

      t.timestamps
    end
  end
end
