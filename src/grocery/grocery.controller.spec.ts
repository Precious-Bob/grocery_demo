import { Test, TestingModule } from '@nestjs/testing';
import { GroceryController } from './grocery.controller';
import { GroceryService } from './grocery.service';

describe('GroceryController', () => {
  let controller: GroceryController;
  let service: GroceryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroceryController],
      providers: [
        {
          provide: GroceryService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<GroceryController>(GroceryController);
    service = module.get<GroceryService>(GroceryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a grocery item', async () => {
      // Arrange
      const dto = {
        name: 'Apple',
        price: 1.99,
        inventory: 0,
        category: 'fruits',
      };
      const expected = { id: '1', ...dto, inventory: 0, category: 'fruits' };
      jest.spyOn(service, 'create').mockResolvedValue(expected);

      // Act
      const result = await controller.create(dto);

      // Assert
      expect(result).toEqual(expected);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return array of grocery items', async () => {
      // Arrange
      const expected = [
        {
          id: '1',
          name: 'Apple',
          price: 1.99,
          inventory: 0,
          category: 'fruits',
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(expected);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual(expected);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single grocery item', async () => {
      // Arrange
      const id = '1';
      const expected = {
        id,
        name: 'Apple',
        price: 1.99,
        inventory: 0,
        category: 'fruits',
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(expected);

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(result).toEqual(expected);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a grocery item', async () => {
      // Arrange
      const id = '1';
      const dto = {
        name: 'Updated Apple',
        price: 2.99,
        inventory: 10,
        category: 'fruits',
      };
      const expected = { id, ...dto };
      jest.spyOn(service, 'update').mockResolvedValue(expected);

      // Act
      const result = await controller.update(id, dto);

      // Assert
      expect(result).toEqual(expected);
      expect(service.update).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('remove', () => {
    it('should remove a grocery item', async () => {
      // Arrange
      const id = '1';
      const expected = { message: 'Grocery item deleted successfully' };
      jest.spyOn(service, 'remove').mockResolvedValue(expected);

      // Act
      const result = await controller.remove(id);

      // Assert
      expect(result).toEqual(expected);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
