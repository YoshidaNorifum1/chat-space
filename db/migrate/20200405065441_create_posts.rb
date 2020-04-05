class CreatePosts < ActiveRecord::Migration[5.0]
  def change
    create_table :posts do |t|
      t.text :body
      t.integer :group_id
      t.integer :user_id
      t.string :image
      t.timestamps
    end
  end
end
