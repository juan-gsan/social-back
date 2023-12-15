import { CodeModel } from '../models/code.model';
import { CodeRepo } from './code.repo';

describe('Given a CodeRepo', () => {
  let codeRepo: CodeRepo;
  beforeEach(() => {
    codeRepo = new CodeRepo();
  });
  describe('When create method is used', () => {
    test('Then CodeModel.create should have been called', async () => {
      CodeModel.create = jest.fn().mockResolvedValue({});
      await codeRepo.create({});
      expect(CodeModel.create).toHaveBeenCalled();
    });
  });
  describe('When search method is used', () => {
    test('Then CodeModel.find shoud have been called', async () => {
      const exec = jest.fn().mockResolvedValue([{ id: 'test' }]);
      const populate = jest.fn().mockReturnValue({ exec });
      CodeModel.find = jest.fn().mockReturnValue({ populate });
      await codeRepo.search({ key: 'id', value: 'test' });
      expect(CodeModel.find).toHaveBeenCalled();
    });
  });
});
