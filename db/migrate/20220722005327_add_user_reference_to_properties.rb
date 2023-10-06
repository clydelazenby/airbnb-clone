class AddUserReferenceToProperties < ActiveRecord::Migration[7.0]
  def up
    add_reference :properties, :user, null: true, foreign_key: true
  end

  def down
    remove_reference :properties, :user, foreign_key: true
  end
end