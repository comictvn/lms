class CreateAssignments < ActiveRecord::Migration[6.0]
  def change
    create_table :assignments do |t|
      t.string :name
      t.text :description
      t.references :user, null: false, index: true, foreign_key: { on_delete: :cascade }

      t.timestamps
    end
  end
end
