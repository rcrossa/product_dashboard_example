import { UserRepository } from '@/domain/repositories/user.repository';
import { UserCredentials, SafeUser } from '@/domain/entities/user.entity';
import { compare } from 'bcryptjs';

export class AuthenticateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(credentials: UserCredentials): Promise<SafeUser | null> {
    const { email, password } = credentials;

    // Find user by email
    const user = await this.userRepository.findByEmail(email);
    
    if (!user) {
      return null;
    }

    // Verify password
    const isPasswordValid = await compare(password, user.password);
    
    if (!isPasswordValid) {
      return null;
    }

    // Return user without password
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
