require 'rails_helper'

# Test suite for Answer model
RSpec.describe Answer, type: :model do
  it { should validate_presence_of(:description) }
  it { should belong_to(:question) }
end
