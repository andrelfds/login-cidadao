<?php

namespace MinC\IDCultura\CoreBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class MinCIDCulturaCoreBundle extends Bundle
{

    public function getParent()
    {
        return 'LoginCidadaoCoreBundle';
    }
}
