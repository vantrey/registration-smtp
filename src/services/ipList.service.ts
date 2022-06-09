import { ipListRepository, IpListRepository } from '../repositories/ipList-repository';
import { getDiffSecBetweenNow } from '../helpers/time';

interface IOption {
  banLimit: number;
  attemptsCountLimit: number;
  timeLimit: number;
}

class IpListService {
  constructor(private repository: IpListRepository) {}

  checkIsIpBlocked = async (
    ip: string,
    endpoint: string,
    option?: Partial<IOption>
  ): Promise<boolean> => {
    const { banLimit = 10, timeLimit = 10, attemptsCountLimit = 5 } = option || {};

    const ipData = await this.repository.findIP(ip, endpoint);

    if (!ipData) {
      await this.repository.setIP({ endpoint, ip });

      return false;
    }

    if (ipData.bannedDate) {
      const banDiff = getDiffSecBetweenNow(ipData.bannedDate);

      if (banDiff > banLimit) {
        await this.repository.resetIpData({ ip, endpoint });

        return false;
      }

      return true;
    }

    const requestDateDiff = getDiffSecBetweenNow(ipData.requestDate);

    if (requestDateDiff > timeLimit) {
      await this.repository.resetIpData({ endpoint, ip });

      return false;
    }

    if (ipData.relativeAttemptCount < attemptsCountLimit) {
      await this.repository.updateAttemptCount({ endpoint, ip }, ipData.relativeAttemptCount + 1);

      return false;
    }

    await this.repository.setBannedDate({ endpoint, ip });

    return true;
  };
}

export const ipListService = new IpListService(ipListRepository);
