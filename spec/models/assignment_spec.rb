require 'rails_helper'

# Test suite for Assignment model
RSpec.describe Assignment, type: :model do
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:description) }
  it { should belong_to(:user) }
end
