<?php

namespace LoginCidadao\CoreBundle\EventListener;

use Doctrine\Common\Cache\MemcacheCache;
use Doctrine\ORM\EntityManager;
use LoginCidadao\CoreBundle\Entity\CityRepository;
use LoginCidadao\OAuthBundle\Entity\Client;
use LoginCidadao\OAuthBundle\Entity\ClientRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class CheckDeployEventSubscriber implements EventSubscriberInterface
{
    const CHECK_DEPLOY_KEY = 'check_deploy';

    /** @var MemcacheCache */
    private $cache;

    /** @var CityRepository */
    private $cityRepository;

    /** @var ClientRepository */
    private $clientRepository;

    /** @var string */
    private $defaultClientUid;

    public function __construct(
        MemcacheCache $cache,
        EntityManager $em,
        $defaultClientUid
    ) {


        $this->cache = $cache;
        $this->cityRepository = $em->getRepository('LoginCidadaoCoreBundle:City');
        $this->clientRepository = $em->getRepository('LoginCidadaoOAuthBundle:Client');
        $this->defaultClientUid = $defaultClientUid;
    }

    /**
     * {@inheritDoc}
     */
    public static function getSubscribedEvents()
    {
        return array(
            KernelEvents::REQUEST => 'checkDeploy',
        );
    }

    public function checkDeploy(GetResponseEvent $event)
    {
        if ($this->cache->contains(self::CHECK_DEPLOY_KEY)) {
            return;
        }

        $clients = $this->clientRepository->countClients();
        $cities = $this->cityRepository->countCities();
        $hasDefaultClient = $this->clientRepository->findOneByUid($this->defaultClientUid) instanceof Client;

        if ($clients <= 0 || $cities <= 0 || !$hasDefaultClient) {
            $this->cache->delete(self::CHECK_DEPLOY_KEY);
            throw new \RuntimeException('Make sure you did run the populate database command.');
        } else {
            $this->cache->save(self::CHECK_DEPLOY_KEY, true);
        }
    }
}
