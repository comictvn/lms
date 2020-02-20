require 'rails_helper'

# Test suite for Question model
RSpec.describe Question, type: :model do
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:description) }
  it { should belong_to(:assignment) }
end
